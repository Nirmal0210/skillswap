export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
