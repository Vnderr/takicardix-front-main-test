function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1 */}
          <div>
            <h5 className="text-lg font-semibold">Takicardix</h5>
            <p className="text-gray-400">Tu tienda de energéticas.</p>
          </div>

          {/* Columna 2 (espacio vacío) */}
          <div></div>

          {/* Columna 3 */}
          <div className="md:text-right">
            <h5 className="text-lg font-semibold">Contacto</h5>
            <p className="text-gray-400">Email: contacto@takicardix.cl</p>
            <p className="text-gray-400">Teléfono: +56 9 1234 5678</p>
          </div>
        </div>

        {/* Separador */}
        <hr className="border-gray-700 my-4" />

        {/* Copyright */}
        <p className="text-center text-gray-500 text-sm">
          &copy; 2025 Takicardix. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
