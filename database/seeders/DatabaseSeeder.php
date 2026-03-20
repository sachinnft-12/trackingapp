<?php

namespace Database\Seeders;

use App\Models\TrackingCode;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * ┌─────────────────────────────────────┐
     * │  DEMO ADMIN LOGIN CREDENTIALS       │
     * │  Email   : admin@demo.com           │
     * │  Password: password                 │
     * └─────────────────────────────────────┘
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@demo.com'],
            [
                'name'              => 'Admin User',
                'password'          => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $trackingCodes = [
            [
                'name'      => 'Google Analytics 4',
                'script'    => "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-DEMO123456');",
                'is_active' => true,
            ],
            [
                'name'      => 'Meta Pixel',
                'script'    => "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');\nfbq('init','000000000000');\nfbq('track','PageView');",
                'is_active' => true,
            ],
            [
                'name'      => 'Hotjar',
                'script'    => "(function(h,o,t,j,a,r){\nh.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\nh._hjSettings={hjid:1234567,hjsv:6};\na=o.getElementsByTagName('head')[0];\nr=o.createElement('script');r.async=1;\nr.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\na.appendChild(r);\n})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');",
                'is_active' => false,
            ],
            [
                'name'      => 'LinkedIn Insight',
                'script'    => "_linkedin_partner_id = \"1234567\";\nwindow._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\nwindow._linkedin_data_partner_ids.push(_linkedin_partner_id);",
                'is_active' => true,
            ],
        ];

        foreach ($trackingCodes as $code) {
            TrackingCode::updateOrCreate(
                ['user_id' => $admin->id, 'name' => $code['name']],
                array_merge($code, ['user_id' => $admin->id])
            );
        }
    }
}
