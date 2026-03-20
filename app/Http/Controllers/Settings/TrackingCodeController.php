<?php

namespace App\Http\Controllers\Settings;

use App\Models\TrackingCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TrackingCodeController
{
    public function index(): Response
    {
        $trackingCodes = Auth::user()->trackingCodes()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($tc) => [
                'id'         => $tc->id,
                'name'       => $tc->name,
                'is_active'  => $tc->is_active,
                'created_at' => $tc->created_at->format('M j, Y'),
            ]);

        return Inertia::render('Settings/TrackingCodes/Index', [
            'trackingCodes' => $trackingCodes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Settings/TrackingCodes/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'script'    => ['required', 'string'],
            'is_active' => ['boolean'],
        ]);

        Auth::user()->trackingCodes()->create($validated);

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code created successfully.');
    }

    public function edit(TrackingCode $trackingCode): Response
    {
        abort_unless(Auth::id() === $trackingCode->user_id, 404);

        return Inertia::render('Settings/TrackingCodes/Edit', [
            'trackingCode' => [
                'id'        => $trackingCode->id,
                'name'      => $trackingCode->name,
                'script'    => $trackingCode->script,
                'is_active' => $trackingCode->is_active,
            ],
        ]);
    }

    public function update(Request $request, TrackingCode $trackingCode): RedirectResponse
    {
        abort_unless(Auth::id() === $trackingCode->user_id, 404);

        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'script'    => ['required', 'string'],
            'is_active' => ['boolean'],
        ]);

        $trackingCode->update($validated);

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code updated successfully.');
    }

    public function destroy(TrackingCode $trackingCode): RedirectResponse
    {
        abort_unless(Auth::id() === $trackingCode->user_id, 404);
        $trackingCode->delete();

        return redirect()
            ->route('settings.tracking-codes.index')
            ->with('success', 'Tracking code deleted successfully.');
    }

    /** Public — called client-side after cookie consent */
    public function forCustomerPage(int $userId): \Illuminate\Http\JsonResponse
    {
        $scripts = TrackingCode::where('user_id', $userId)
            ->active()
            ->get(['id', 'script'])
            ->map(fn ($tc) => ['id' => $tc->id, 'script' => $tc->script]);

        return response()->json($scripts);
    }
}
