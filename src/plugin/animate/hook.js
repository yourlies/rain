import Scroll from './lib/Scroll';
import Loading from './lib/Loading';

const hook = {};
hook.subscription = [];
hook.callback = (event) => {
    switch (event) {
        case 'commentsturnpage':
            const scroll = new Scroll();
            scroll.option({ elName: '.comment-analysis', time: 1000 });
            scroll.play();
        break;
        case 'loadingstart':
        case 'loadingstop':
            const buffer = document.querySelector('.buffer');
            if (event == 'loadingstart') {
                buffer.style.display = 'block';
                const loading = new Loading();
                loading.option({ elName: '.loading', time: 10000 });
                loading.play();
            } else {
                buffer.style.display = 'none';
            }
            
        break;
        default:
        break;
    }
};

export default hook;