export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-neutral-400">
        <p>© {new Date().getFullYear()} Cryptid Research Foundation. All rights reserved.</p>
      </div>
    </footer>
  );
}
