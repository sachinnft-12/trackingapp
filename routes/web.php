<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\TrackingCodeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Welcome page ──────────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// ── Dashboard ─────────────────────────────────────────────────────────────────
Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// ── Authenticated routes ──────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Settings — Tracking Codes CRUD
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::resource('tracking-codes', TrackingCodeController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    });
});

// ── Customer-facing ───────────────────────────────────────────────────────────

// Public JSON endpoint — returns active tracking scripts for a creator
Route::get('/customer/tracking-codes/{userId}', [TrackingCodeController::class, 'forCustomerPage'])
    ->name('customer.tracking-codes');

// Demo customer page with cookie banner
Route::get('/customer/preview', function () {
    return Inertia::render('customer/Preview', [
        'creatorUserId' => auth()->id() ?? 1,
    ]);
})->name('customer.preview');

require __DIR__ . '/auth.php';
