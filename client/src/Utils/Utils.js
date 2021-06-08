export const isAdminLookingForProfile = window.location.href.match("/profiles/"); //check if Admin from AdminPage looking for profile of selected user
export const userIdFromURL = () => {
  if (isAdminLookingForProfile) {
    const indexOfIdInURL =
      window.location.href.match("/profiles/")["index"] + 10;
    const idFromURL = window.location.href.slice(indexOfIdInURL);
    return idFromURL; //get id of selected user by Admin
  }
  return 0;
};