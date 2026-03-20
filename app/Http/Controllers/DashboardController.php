<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __invoke(): Response
    {
        $user  = Auth::user();
        $codes = $user->trackingCodes()->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total'    => $codes->count(),
                'active'   => $codes->where('is_active', true)->count(),
                'inactive' => $codes->where('is_active', false)->count(),
            ],
            'recentCodes' => $codes
                ->sortByDesc('created_at')
                ->take(5)
                ->map(fn ($tc) => [
                    'id'         => $tc->id,
                    'name'       => $tc->name,
                    'is_active'  => $tc->is_active,
                    'created_at' => $tc->created_at->format('M j, Y'),
                ])
                ->values(),
        ]);
    }
}
