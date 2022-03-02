/**
 * Checks if provided grade value is in college
 * @param grade
 * @returns
 */
 export const isInCollege = (grade: string) => {
    if (grade === 'freshman') return true;
    if (grade === 'sophomore') return true;
    if (grade === 'junior') return true;
    if (grade === 'senior') return true;
    return false;
  };
  
  export const hasGraduated = (grade: string) => {
    if (grade === 'graduated') return true;
    return false;
  };
  
  export const isInMiddleSchool = (grade: string) => {
    if (grade.includes('5')) return true;
    if (grade.includes('6')) return true;
    if (grade.includes('7')) return true;
    if (grade.includes('8')) return true;
    return false;
  };
  
  export const isInHighSchool = (grade: string) => {
    if (grade.includes('9')) return true;
    if (grade.includes('10')) return true;
    if (grade.includes('11')) return true;
    if (grade.includes('12')) return true;
    return false;
  };