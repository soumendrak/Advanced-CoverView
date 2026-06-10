import { createApi } from 'unsplash-js';

const key = import.meta.env.VITE_API_ACCESS_KEY
const unsplash = createApi({
    accessKey: key
});

export default unsplash;