<script>
    @if ($errors->any())
        @foreach ($errors->all() as $error)
            toast('{{ $error }}', 'error')
        @endforeach
    @endif

    @if (session('warning'))
        toast('{{ session('warning') }}', 'warning')
    @endif

    @if (session('message'))
        toast('{{ session('message') }}', 'success')
    @endif

    @if (session('error'))
        toast('{{ session('error') }}', 'error')
    @endif
</script>