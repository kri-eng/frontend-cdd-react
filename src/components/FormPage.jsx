
import Header from "./Header";
import Form from "./Form";

function FormPage() {

  return (
    <div className="flex flex-col gap-10">
      <Header />
      <hr className="border-t-2 border-white/20 w-full" />

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w">
        <Form />
      </div>
    </div>
  );
}

export default FormPage;