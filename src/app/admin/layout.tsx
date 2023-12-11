export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid min-h-screen w-screen place-content-center">
        {children}
      </div>
    </>
  );
}
