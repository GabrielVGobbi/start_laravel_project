<?php

use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * Makes translation fall back to specified value if definition does not exist
 *
 * @param string $key
 * @param null|string $fallback
 * @param null|string $locale
 * @param array|null $replace
 *
 * @return array|\Illuminate\Contracts\Translation\Translator|null|string
 */
function __trans($key = '', ?string $fallback = null, ?string $locale = null, ?array $replace = [])
{
    if (\Illuminate\Support\Facades\Lang::has($key, $locale) && !empty($key)) {
        return trans($key, $replace, $locale);
    }
    return $key;
}

function _mix($path)
{
    return config('app.env')  == 'production' ? url(asset(mix($path))) : asset($path);
}

function uuid()
{
    return Str::uuid();
}

function slug($value, $caracter = '_')
{
    return Str::slug(mb_strtolower($value, 'UTF-8'), $caracter);
}