<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta ref="js-base_url" content="{{ env('APP_URL') }}">
    <meta ref="js-base_url_api" content="{{ env('APP_URL_API') }}">

    <title>Login</title>

    <!-- Scripts -->
    <script src="{{ _mix('painel/js/vendor.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('panel/css/main.css') }}" rel="stylesheet">
    <link href="{{ asset('panel/css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <script src="{{ _mix('painel/js/app.js') }}"></script>

    <x-toastr> </x-toastr>
</body>

</html>
