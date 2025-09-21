function Input({ id, name, range, label, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-white">
        {label} <span className="font-thin text-sm text-gray-200">{range}</span>
      </label>
      <input
        id={id}
        name={name || id}
        {...props}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

export default Input;