import PropTypes from "prop-types";

TeamCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    linkedin: PropTypes.string, // Added since you're using member.linkedin
  }).isRequired,
};

function TeamCard({ member }) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border-l-4 border-[#4f46e5] shadow-md hover:shadow-lg transition-all duration-300 max-w-xl mb-5  w-11/12">
      <div className="bg-gradient-to-br from-[#4f46e5] to-emerald-600 flex items-center justify-center p-5">
        <div className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-125"
          />
        </div>
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
        <p className="text-md font-medium text-[#4f46e5] mt-1">
          {member.designation}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Team member with expertise of over 3 years in their field and a passion for
          collaboration.
        </p>

        <div className="mt-3 flex justify-between items-center">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <button className="py-2 px-4 bg-[#4f46e5] hover:bg-indigo-700 text-white rounded-lg font-medium text-sm transition duration-300 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Connect
            </button>
          </a>

          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-[#4f46e5] transition-colors">
            <a href="mailto:raushankumar23082004@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              </a>
            </button>
            {/* <button className="p-2 text-gray-600 hover:text-[#4f46e5] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export { TeamCard };
