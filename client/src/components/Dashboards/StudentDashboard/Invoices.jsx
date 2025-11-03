import { useState, useEffect } from "react";

function Invoices() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [invoiceList, setInvoiceList] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [paidInvoices, setPaidInvoices] = useState(0);

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
        if (data.success) {
          let invoices = data.invoices;
          let List = [];
          let paidInvoices = 0;
          let pendingInvoices = 0;

          invoices.forEach((invoice) => {
            if (invoice.status.toLowerCase() === "paid") {
              paidInvoices += 1;
            } else {
              pendingInvoices += 1;
            }
            let date = new Date(invoice.date);
            invoice.date = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            List.push({
              title: invoice.title,
              amount: "Rs. " + invoice.amount,
              status: invoice.status,
              date: invoice.date,
            });
          });
          setInvoiceList(List);
          setTotalInvoices(invoices.length);
          setPaidInvoices(paidInvoices);
          setPendingInvoices(pendingInvoices);
        }
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col gap-8 items-center py-10 px-4 overflow-y-auto mt-12">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-[#4f46e5]">Invoices</h1>
      <p className="text-lg text-center text-black max-w-xl">
        All your invoices like Mess Bills, Hostel Fees will be shown here.
      </p>

      {/* Statistics Cards */}
      <div className="flex flex-wrap gap-8 justify-center mt-6">
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-2xl w-48">
          <dt className="mb-2 text-5xl font-extrabold text-[#4f46e5]">{totalInvoices}</dt>
          <dd className="text-gray-500 text-center">Total Invoices</dd>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-2xl w-48">
          <dt className="mb-2 text-5xl font-extrabold text-[#4f46e5]">{paidInvoices}</dt>
          <dd className="text-gray-500 text-center">Paid Invoices</dd>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-2xl w-48">
          <dt className="mb-2 text-5xl font-extrabold text-[#4f46e5]">{pendingInvoices}</dt>
          <dd className="text-gray-500 text-center">Pending Invoices</dd>
        </div>
      </div>

      {/* Latest Invoices */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-2xl font-bold text-[#4f46e5]">Latest Invoices</h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-300">
            {invoiceList.map((invoice, index) => (
              <li className="py-4" key={index}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-[#4f46e5]">
                    {invoice.status.toLowerCase() === "pending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
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
                        className="w-8 h-8"
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
                    <p className="text-base font-medium text-black truncate">
                      {invoice.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-base font-semibold text-black">
                    {invoice.amount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
