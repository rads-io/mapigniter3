import Store from 'react-observable-store';

export const DashboardLoad = () => {
    var exists = Store.get('dashboard.data1')
    console.log(exists)
    //if (Object.keys(exists).length) return true;
    Store.update('dashboard', {loading: true });
    var endpoint = Store.get('server.endpoint');
    fetch(endpoint + '/dashboard', {
        headers: {
            'Accept': 'application/json, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            Store.update('dashboard', {
                data1: data.data1,
                loading: false
            });
        }
    });
};