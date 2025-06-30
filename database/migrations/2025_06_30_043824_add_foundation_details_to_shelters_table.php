<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shelters', function (Blueprint $table) {
            $table->text('description')->nullable()->after('name');
            $table->string('address')->nullable()->after('description');
            $table->string('city')->nullable()->after('address');
            $table->string('phone')->nullable()->after('city');
            $table->string('bank_name')->nullable()->after('phone');
            $table->string('account_type')->nullable()->after('bank_name');
            $table->string('account_number')->nullable()->after('account_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shelters', function (Blueprint $table) {
            $table->dropColumn([
                'description',
                'address',
                'city',
                'phone',
                'bank_name',
                'account_type',
                'account_number'
            ]);
        });
    }
};
