<?php

namespace Database\Seeders;

use App\Models\User as ModelsUser;
use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ModelsUser::create(
            [
                'name' => 'Super Admin',
                'password' => '$2y$10$hBIkxTJLzwCa81qGl0TtT.6s/xWXZd0wmtXosFdmHV38yDjSxQ31m', //superadmin
                'email' => 'super@admin',
                'uuid' => 'e3f053e2-1539-4241-affc-879d21sd4875',
                'email_verified_at' => now(),
            ]
        );
    }
}
