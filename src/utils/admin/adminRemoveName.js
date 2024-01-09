function adminRemoveName(name, adminList) {
    var index = adminList.indexOf(name);
    if (index > -1) {
        adminList.splice(index, 1);
        API.getIWorld(0).setStoredData('adminList', JSON.stringify(adminList));
    }
}