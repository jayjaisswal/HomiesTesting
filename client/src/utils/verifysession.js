const verifysession = async () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
    let response = await fetch(`${mainUri}/api/auth/verifysession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: localStorage.getItem("token")})
    });

    let result = await response.json();
    if (result.success) {
      if (result.data.isAdmin) {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }
    }
    else {
      localStorage.removeItem("token");
      localStorage.removeItem("student");
    }
  };

  export default verifysession;