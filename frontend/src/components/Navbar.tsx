export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">OpenPolicyEnv</h1>
      <div className="space-x-4">
        <a href="#tasks">Tasks</a>
        <a href="#analytics">Analytics</a>
      </div>
    </nav>
  );
}