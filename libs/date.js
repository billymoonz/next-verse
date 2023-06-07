import sugar from 'sugar';

sugar.Date.extend();

export const formatDate = (date, format) =>{
    return sugar.Date.create(date).format(format);
}