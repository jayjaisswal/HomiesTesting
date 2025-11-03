import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const List = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [invoiceList, setInvoiceList] = useState([
    {
      title: "Mess bill",
      date: "20-5-2023",
      amount: "Rs. 690",
      status: "pending",
    },
    
  ]);

  useEffect(() => {
  let student = JSON.parse(localStorage.getItem("student"));
  fetch(`${mainUri}/api/invoice/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student: student._id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Invoice API response:", data); // <-- Add this line
      if (data.success) {
        let invoice = data.invoices[0];
        let list = [];
        invoices.forEach((invoice) => {
          if (invoice.status.toLowerCase() === "pending") {
            let date = new Date(invoice.date);
            invoice.date = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            list.push({
              title: invoice.title,
              amount: "Rs. " + invoice.amount,
              status: invoice.status,
              date: invoice.date,
            });
          }
        });
        setInvoiceList(list);
      }
    });
}, []);

  return (
    <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white overflow-y-auto max-h-96">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-bold text-gray-800">
          Unpaid Invoices
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-300">
          {invoiceList.map((invoice, index) => (
            <li className="py-4" key={index}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-gray-700">
                  {invoice.status.toLowerCase() === "pending" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8 text-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {invoice.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {invoice.date}
                  </p>
                </div>
                <div className="flex flex-col items-center text-base font-semibold text-gray-900">
                  {invoice.amount}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function Home() {
  let student = JSON.parse(localStorage.getItem("student"));

  const getAttendance = async () => {
    let student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch(`${mainUri}/api/attendance/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) {
      let daysOff = 0;
      data.attendance.map((day) => {
        if (day.status === "absent") {
          daysOff++;
        }
      });
      setDaysOff(daysOff);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const labels = ["Days off", "Days present"];
  let totalDays = new Date();
  totalDays = totalDays.getDate();
  const [daysOff, setDaysOff] = useState(0);

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center flex-col gap-8 py-20 px-5 overflow-y-auto">
      <h1 className="text-gray-800 font-bold text-5xl text-center">
        Welcome <span className="text-blue-600">{student.name}!</span>
      </h1>
      <div className="flex gap-10 w-full justify-center flex-wrap">
        <List />
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-80">
          <span className="text-gray-800 text-2xl font-semibold mb-4">Attendance</span>
          <Doughnut
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "days",
                  data: [daysOff, totalDays - daysOff],
                  backgroundColor: ["#facc15", "#3b82f6"], // Yellow and Blue
                  borderColor: "transparent",
                  hoverOffset: 12,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "gray",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
