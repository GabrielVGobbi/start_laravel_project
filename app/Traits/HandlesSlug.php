<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait HandlesSlug
{
    public static function bootHandlesSlug()
    {
        static::creating(function (Model $model) {
            $model->slug = slug($model->name, '-');
        });

        static::updating(function (Model $model) {
            $model->slug = slug($model->name, '-');
        });
    }
}
