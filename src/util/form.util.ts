import { IPickerItem } from "../interfaces/picker.interface";


/**
 * Returns a boolean value. True if the form values do not have
 * any validation errors
 *
 * @param validationState The form validation obj which contains errors if they exist
 * @returns Boolean value
 */
export const getFormValidationStatus = (validationState: any): boolean => {
  let isValid = true;

  // @ts-ignore
  for (const [key, value] of Object.entries(validationState)) {
    const payload: any = value;

    if (payload.hasError) {
      isValid = false;
    }
  }

  return isValid;
};

export function stringMapHelper(data: any | null): any {
  if (data) return data;
  return '';
}

/**
 * Scrolls user to errors on the form
 */
export const scrollToErr = () => {
  const element = document.querySelectorAll('.rs-form-error-message-show');

  if (element && element[0]) {
    // scroll to error input
    element[0].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

/**
 * Return picker list of picker items with the
 * current date and the previous nth dates
 * @param years
 * @returns
 */
export function getDateRange(years: number): IPickerItem[] {
  const range: IPickerItem[] = [];

  function getPickerItem(item: string): IPickerItem {
    return {
      label: `${item}`,
      value: `${item}`,
      role: 'Cohort Year',
    };
  }
  // get todays year
  const today = new Date().getFullYear();

  // add the years before current date
  for (let i of Array.from(Array(years).keys())) {
    range.push(getPickerItem(`${today - i - 1}`));
  }

  // add today
  range.push(getPickerItem(`${today}`));


  range.sort((a, b) => {
    if (a.value > b.value) {
      return -1;
    } else if (b.value > a.value) {
      return 1;
    } else {
      return 0;
    }
  });

  return range;
}
