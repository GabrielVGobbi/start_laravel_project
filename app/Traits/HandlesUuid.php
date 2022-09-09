<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait HandlesUuid
{
    public static function bootHandlesUuid()
    {
        static::creating(function (Model $model) {
            $model->uuid = uuid();
        });
    }
}
