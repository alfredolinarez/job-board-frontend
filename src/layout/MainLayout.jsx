import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ paddingBottom: "140px" }}>{children}</div>
      <div className="absolute bottom-0 inset-x-0">
        <Footer />
      </div>
    </div>
  );
}
