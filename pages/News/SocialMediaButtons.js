import React from "react";

const SocialMediaButtons = () => {
  return (
    <div>
      <div className="flex items-center mb-5">
        <div className="w-2 h-5 rounded-full bg-[#F81539]"></div>
        <h3 className="text-Black font-work-sans text-base font-medium capitalize ml-2">
          Share Via
        </h3>
      </div>
      <div className="flex gap-2">
        <div>
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-full mb-2 flex items-center gap-2 rounded px-6 py-2.5 text-xs font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{ backgroundColor: "#4581FF" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="27"
              viewBox="0 0 29 29"
              fill="none"
            >
              <path
                d="M20.4167 10.5H17.5833C16.8319 10.5 16.1112 10.7985 15.5799 11.3299C15.0485 11.8612 14.75 12.5819 14.75 13.3333V27.5"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 17.5833H19M14.75 2C12.2283 2 9.76321 2.74777 7.66649 4.14876C5.56976 5.54975 3.93556 7.54103 2.97054 9.87079C2.00552 12.2005 1.75303 14.7641 2.24499 17.2374C2.73695 19.7107 3.95127 21.9825 5.73439 23.7656C7.51751 25.5487 9.78935 26.7631 12.2626 27.255C14.7359 27.747 17.2995 27.4945 19.6292 26.5295C21.959 25.5644 23.9503 23.9302 25.3512 21.8335C26.7522 19.7368 27.5 17.2717 27.5 14.75C27.5 11.3685 26.1567 8.12548 23.7656 5.73439C21.3745 3.3433 18.1315 2 14.75 2Z"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Facebook
          </button>
        </div>
        {/* Twitter */}
        <div>
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-full mb-2 flex items-center gap-2 rounded px-6 py-2.5 text-xs font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{ backgroundColor: "#41BFF6" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="27"
              viewBox="0 0 34 35"
              fill="none"
            >
              <path
                d="M26.8317 11.5359C26.6633 10.2863 26.0501 9.1456 25.111 8.33505C24.172 7.5245 22.9739 7.10185 21.7493 7.14908C20.5246 7.19631 19.3607 7.71005 18.4831 8.59066C17.6056 9.47127 17.0771 10.656 17 11.915C11.985 14.0442 7.08333 8.75045 7.08333 8.75045C5.66667 17.5005 9.91667 21.5109 9.91667 21.5109C7.99 23.3338 4.25 23.3338 4.25 23.3338C4.25 23.3338 6.48833 27.7088 16.405 27.7088C26.3217 27.7088 26.9167 16.0421 26.9167 16.0421C27.8508 15.6922 28.6409 15.0244 29.1562 14.1492C29.6714 13.2741 29.8809 12.244 29.75 11.2296C28.7945 11.4631 27.8133 11.566 26.8317 11.5359Z"
                fill="white"
              />
            </svg>
            Twitter
          </button>
        </div>
        {/* Linkedin */}
        <div>
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-full mb-2 flex items-center gap-2 rounded px-6 py-2.5 text-xs font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
            style={{ backgroundColor: "#278DC8" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
            >
              <path
                d="M18.3333 20.4444V16.2778C18.3333 15.5411 18.0524 14.8345 17.5523 14.3136C17.0522 13.7927 16.3739 13.5 15.6667 13.5C14.9594 13.5 14.2811 13.7927 13.781 14.3136C13.281 14.8345 13 15.5411 13 16.2778V20.4444"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.66667 13.5V20.4444M13 16.2778V13.5M23.6667 26H2.33333C1.97971 26 1.64057 25.8537 1.39052 25.5932C1.14048 25.3327 1 24.9795 1 24.6111V2.38889C1 2.02053 1.14048 1.66726 1.39052 1.4068C1.64057 1.14633 1.97971 1 2.33333 1H23.6667C24.0203 1 24.3594 1.14633 24.6095 1.4068C24.8595 1.66726 25 2.02053 25 2.38889V24.6111C25 24.9795 24.8595 25.3327 24.6095 25.5932C24.3594 25.8537 24.0203 26 23.6667 26Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.59961 7.25H7.73294"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Linkedin
          </button>
        </div>
        {/* Whatsapp */}
        <div>
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-full mb-2 flex items-center gap-2 rounded px-6 py-2.5 text-xs font-medium leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
            style={{ backgroundColor: "#05EA00" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M8.94248 11.7068L10.8125 9.82499L10.3236 8.11421H8.11137C8.11137 8.11421 7.61026 11.2181 11.1914 14.7862C14.7725 18.3544 17.8891 17.8901 17.8891 17.8901V15.6783L16.178 15.1895L14.2958 17.0591M23.8536 14.7862C23.5719 16.4971 22.8897 18.117 21.8625 19.514C20.8353 20.911 19.4924 22.0453 17.9432 22.8245C16.394 23.6037 14.6825 24.0057 12.9484 23.9976C11.2142 23.9895 9.50654 23.5716 7.9647 22.778L2.00026 24L3.22248 18.0367C2.42481 16.4895 2.00585 14.7751 2.00006 13.0344C1.99427 11.2938 2.40181 9.5766 3.18918 8.02411C3.97654 6.47162 5.12124 5.12816 6.52914 4.1042C7.93704 3.08024 9.56793 2.40502 11.2877 2.13406C13.0075 1.86311 14.767 2.00415 16.4217 2.54561C18.0763 3.08706 19.5788 4.01346 20.8055 5.24862C22.0322 6.48378 22.9482 7.99243 23.4781 9.65051C24.008 11.3086 24.1367 13.0687 23.8536 14.7862Z"
                stroke="white"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Whatsapp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaButtons;
