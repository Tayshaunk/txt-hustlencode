/**
 * Returns the complete redux store object
 * It includes all reducers
 * @param _previousState  previous state
 * @param updatedStateProperties the new properties for state
 */
export const updateStateObject = (
  previousState: any,
  updatedProperties: any
) => ({
  ...previousState,
  ...updatedProperties,
})
