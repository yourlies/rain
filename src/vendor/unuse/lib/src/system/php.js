import empty from 'locutus/php/var/empty';
import trim from 'locutus/php/strings/trim';
import ltrim from 'locutus/php/strings/ltrim';
import ucfirst from 'locutus/php/strings/ucfirst';
import time from 'locutus/php/datetime/time';
import explode from 'locutus/php/strings/explode';
import http_build_query from 'locutus/php/url/http_build_query';

export default {
    time: time,
    trim: trim,
    ltrim: ltrim,
    empty: empty,
    ucfirst: ucfirst,
    explode: explode,
    http_build_query: http_build_query,
};