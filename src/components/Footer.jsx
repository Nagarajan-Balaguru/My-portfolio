export default function Footer() {
  return (
    <footer className="py-8 border-t border-[#21262d] text-center">
      <p className="text-[#8b949e] text-sm">
        © {new Date().getFullYear()} <span className="text-[#3fb950]">Nagarajan</span> — Built with React + Spring Boot + MongoDB
      </p>
      <p className="text-[#484f58] text-xs mt-1">Designed & Developed with ♥</p>
    </footer>
  );
}