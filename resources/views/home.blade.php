@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Buttons</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <button type="" class="btn btn-danger" data-js="btn-confirm-submit"
                            data-action="DELETE" data-route="rotaDeDeletar">Trash</button>

                        <button type="button" class="btn btn-success" data-js="btn-confirm-submit"
                            data-action="POST" data-route="rotaDeSalvar">Submit</button>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Inputs</div>

                    <div class="card-body">
                        <textarea name="" id="" cols="30" rows="2" class="form-control"></textarea>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Maks Js</div>

                    <div class="card-body">
                        <div class="form-group">
                            <label for="" class="">Phone</label>
                            <input type="text" class="form-control " data-js-mask="phone" id="input-number" name="name">
                        </div>

                        <div class="form-group">
                            <label for="" class="">CEP</label>
                            <input type="text" class="form-control " data-js-mask="cep" id="input-number" name="name">
                        </div>

                        <div class="form-group">
                            <label for="" class="">CPF / CNPJ</label>
                            <input type="text" class="form-control " data-js-mask="cpfCnpj" id="input-number" name="name">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    @endsection
