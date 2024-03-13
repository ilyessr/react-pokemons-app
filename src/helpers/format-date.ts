const formatDate = (date: Date = new Date()): string =>
  date.toLocaleDateString('fr-FR');
   
export default formatDate;