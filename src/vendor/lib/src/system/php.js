import empty from 'locutus/php/var/empty';
import trim from 'locutus/php/strings/trim';
import ltrim from 'locutus/php/strings/ltrim';
import ucfirst from 'locutus/php/strings/ucfirst';
import time from 'locutus/php/datetime/time';
import explode from 'locutus/php/strings/explode';
import implode from 'locutus/php/strings/implode';
import sha1 from 'locutus/php/strings/sha1';
import http_build_query from 'locutus/php/url/http_build_query';

export default {
    time,
    trim,
    ltrim,
    empty,
    ucfirst,
    explode,
    http_build_query,
    implode,
    sha1
};