
# T.Nestia — A Comprehensive Digital Hub for Students & Teachers

T.Nestia is a full-stack web application designed to facilitate seamless interaction between students, teachers, and admins in an educational environment. It combines role-based access control, resource sharing, assignment management, and communication tools into one cohesive platform. This project aims to empower users by providing an intuitive, secure, and efficient digital learning experience.

---

## Key Features & Functionality

- **User Authentication & Roles:** Secure login/signup with bcrypt password hashing. Role-based dashboards for Students, Teachers, and Admins.
- **Role-specific Views:** Students access personal dashboards; Teachers manage their classes and assignments; Admins oversee the entire platform with user statistics.
- **Database Integration:** MongoDB with Mongoose schema to store users, roles, and other data securely.
- **Responsive UI:** Clean, modern interface powered by EJS templates and styled with Tailwind CSS.
- **Security:** Passwords are hashed; user inputs validated; sessions managed (future enhancement planned).
- **Planned Upgrades:** Department & section management, profile pages, assignment submissions, live notifications, and more.

---

## Tech Stack

| Layer          | Technology        |
|----------------|-------------------|
| Backend        | Node.js, Express  |
| Database       | MongoDB (Mongoose)|
| Frontend       | EJS templating, Tailwind CSS |
| Authentication | bcrypt            |
| Hosting        | Local / Cloud (planned) |

---

## Project Structure

```

SD3-TNEST/
│
├── public/             # Static assets: CSS, images (screenshots), JS
│   ├── screenshot1.jpg
│   ├── login\_page.jpg
│   ├── admin\_dashboard.jpg
│   └── style.css
├── routes/             # Express route files for user auth and navigation
├── controllers/        # Logic handlers: signup, login, role control
├── models/             # Mongoose schemas and models (User.js etc.)
├── views/              # EJS templates (HTML with dynamic content)
├── index.js            # App entry point: server and middleware config
├── package.json        # Project metadata & npm dependencies
└── README.md           # Project documentation (this file)

````

---

## Getting Started

### Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB installed locally or MongoDB Atlas cloud URI
- Git for cloning the repository

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SD3-TNEST.git
   cd SD3-TNEST
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB connection:

   * By default, the app connects to `mongodb://localhost:27017/ProjectSD3`.
   * Change the connection string in `index.js` if using cloud MongoDB.

4. Start the server:

   ```bash
   node index.js
   ```

5. Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Screenshots & Visual Overview

### Welcome & Landing Page

The welcoming entry point with quick access to login or sign up. It includes vibrant UI elements and a smooth user experience designed with Tailwind CSS.

![Welcome Page](public/screenshot1.jpg)

*Screenshot of the T.Nestia landing page showcasing the main call-to-action buttons.*

---

### Login Page

Secure login form supporting email/password authentication. The page includes social login icons for future integrations and responsive design for mobile use.

![Login Page](public/login_page.jpg)

*Login form allowing users to access their role-based dashboard.*

---

### Admin Dashboard

The admin panel shows real-time statistics like total users, teachers, and students, giving the admin full oversight of platform activity.

![Admin Dashboard](public/admin_dashboard.jpg)

*Admin dashboard with analytics and user management overview.*

---

## Usage Guide

* **Sign Up:** New users can create accounts specifying their role (student/teacher). Admin accounts are created manually for security.
* **Log In:** Based on the role, users are routed to different dashboards with appropriate controls.
* **Admin:** Can view overall user statistics and in the future will manage user creation and deletion.
* **Teachers & Students:** Access personalized dashboards (future features to include class sections, assignment uploads, and messaging).

---

## Future Roadmap & Enhancements

* **Department & Section Support:** Users select their department and section at signup; teachers connect with their students in the same sections.
* **User Profiles:** Editable profile pages for all users to manage personal info.
* **Assignment Module:** Upload, submit, and grade assignments.
* **Real-Time Notifications:** Instant announcements and communication tools.
* **Admin Control Panel:** Full management of users including adding/deleting students and teachers.
* **Mobile App:** Expansion of T.Nestia into mobile platforms for accessibility on the go.

---

## Contribution

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/yourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/yourFeature`).
5. Open a Pull Request.

Please follow coding best practices and include tests where applicable.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact & Support

**Md Shahriar (Boss)**
Email: [sahriar@gmail.com](mailto:sahriar@gmail.com)
GitHub: [https://github.com/yourusername](https://github.com/yourusername)

---

*Thank you for exploring T.Nestia — Empowering education through technology!*

```

---

### Where to Put Screenshots?

Put your screenshots in the `/public` folder since it’s already used for static files in your project.

Example:

- `public/screenshot1.jpg` — Welcome/Landing page
- `public/login_page.jpg` — Login page
- `public/admin_dashboard.jpg` — Admin dashboard


