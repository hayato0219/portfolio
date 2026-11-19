export default function NotFound() {
  return (
    <main className="container notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__msg">Page not found.</h1>
      <a href="/" className="btn">
        Go home
      </a>
    </main>
  );
}
