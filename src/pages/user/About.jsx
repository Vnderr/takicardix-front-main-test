function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Quiénes Somos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre Nosotros */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              Sobre Nosotros
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Somos un grupo de estudiantes apasionados por la tecnología y el
              aprendizaje. Creamos esta tienda en línea como parte de nuestro
              proyecto educativo para aprender programación.
            </p>
          </div>

          {/* Nuestra Misión */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nuestro objetivo es ofrecer una experiencia sencilla y divertida
              para quienes quieren descubrir nuevos productos y conocer cómo
              funciona una tienda online.
            </p>
          </div>

          {/* Nuestro Equipo */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Unimos nuestros conocimientos para crear esta web, aprendiendo a
              usar HTML, CSS y JavaScript. Valoramos la colaboración y la
              creatividad.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Benjamin - Programador
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                Brad - Programador
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Anderson - Programador
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
