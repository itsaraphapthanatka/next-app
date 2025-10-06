export default function Footer() {
    return (
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>
          Version: <b>{process.env.NEXT_PUBLIC_APP_VERSION}</b>{" "}
          ({process.env.NEXT_PUBLIC_COMMIT_HASH})
        </p>
      </footer>
    );
  }
  