const getAllStudents = async () => {
    const mainUri = import.meta.env.VITE_MAIN_URI;
    const hostels = JSON.parse(localStorage.getItem("admin"));
    const result = await fetch(`${mainUri}/api/student/get-all-students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: hostels.hostel }),
    });
    const data = await result.json();
    return data;
};

export default getAllStudents;