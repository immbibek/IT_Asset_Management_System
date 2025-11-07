const Card = ({ children, className = "", title, icon }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="text-blue-600">{icon}</div>}
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
