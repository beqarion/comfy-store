import { Loading } from "@/shared/ui";
import Header from "@/widgets/Header";
import Navbar from "@/widgets/Navbar";
import { Outlet, useNavigation } from "react-router-dom";

function HomeLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-20">
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </>
  );
}
export default HomeLayout;
