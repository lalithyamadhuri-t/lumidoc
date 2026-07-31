export default function ToolHeader({ title, description }) {

  return (

    <div className="text-center mb-10">

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        {title}
      </h1>


      <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
        {description}
      </p>


    </div>

  );

}