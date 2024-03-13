export const formatType = (type: string): string => {
  let colorClass: string;

  switch (type) {
    case "Feu":
      colorClass = "bg-red-500";
      break;
    case "Eau":
      colorClass = "bg-blue-500";
      break;
    case "Plante":
      colorClass = "bg-green-500";
      break;
    case "Insecte":
      colorClass = "bg-lime-500";
      break;
    case "Normal":
      colorClass = "bg-gray-400";
      break;
    case "Vol":
      colorClass = "bg-sky-400";
      break;
    case "Poison":
      colorClass = "bg-purple-600";
      break;
    case "Fée":
      colorClass = "bg-pink-400";
      break;
    case "Psy":
      colorClass = "bg-pink-600";
      break;
    case "Electrik":
      colorClass = "bg-yellow-400";
      break;
    case "Combat":
      colorClass = "bg-red-700";
      break;
    case "Acier":
      colorClass = "bg-gray-500";
      break;
    case "Spectre":
      colorClass = "bg-purple-800";
      break;
    case "Ténèbre":
      colorClass = "bg-gray-700";
      break;
    case "Dragon":
      colorClass = "bg-indigo-600";
      break;
    case "Sol":
      colorClass = "bg-yellow-600";
      break;
    case "Roche":
      colorClass = "bg-yellow-700";
      break;
    case "Glace":
      colorClass = "bg-cyan-300";
      break;
    default:
      colorClass = "bg-gray-400";
      break;
  }

  return `px-2 py-1 text-xs font-semibold text-white rounded-full mr-2 ${colorClass}`;
};
