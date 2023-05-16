import { linkIcon } from "../assets/index";

const InputBox = ({ searchBox, handleSubmit, result, setResult }) => {
  return (
    <div className="flex flex-col w-full">
      <form
        ref={searchBox}
        onSubmit={handleSubmit}
        className="relative flex justify-center items-center"
      >
        <img className="absolute my-3 ml-3 w-5 left-0 " src={linkIcon} alt="" />
        <input
          value={result.url}
          onChange={(e) =>
            setResult({
              ...result,
              url: e.target.value,
            })
          }
          className="url_input peer w-full"
          type="text"
          required
          placeholder="Enter Your Targeted URL or Articles"
        />
        <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
          &#9166;
        </button>
      </form>
    </div>
  );
};

export default InputBox;
