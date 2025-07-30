function Footer({ className }) {
  return (
    <footer className={`text-center py-4 text-sm bg-gray-950 ${className}`}>
      <p className="text-gray-500">
        © {new Date().getFullYear()} Khevynn Sá. All rights reserved.
      </p>
      <p className="text-gray-500">
        Built with React and Tailwind CSS.{" "}
        <a href="/admin/dashboard" className="text-blue-500 hover:underline">
          Admin Page
        </a>
      </p>
    </footer>
  );
}

export default Footer;
