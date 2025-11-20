import { NextResponse } from 'next/server';
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server';

// In-memory store for login challenges (demo only)
const loginChallengeStore: Record<string, string> = {};

// Helper to convert base64 to base64url
function base64ToBase64url(base64: string): string {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Helper to convert base64url to base64
function base64urlToBase64(base64url: string): string {
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }
    return base64;
}

// Get rpID from environment - use hostname from NEXT_PUBLIC_SITE_URL
function getRpID(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return new URL(siteUrl).hostname;
}

// Get expected origin
function getExpectedOrigin(): string {
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export async function POST(req: Request) {
    try {
        const { email, step, assertionResponse } = await req.json();

        // Step 1: generate authentication options
        if (step === 'options') {
            // Mock user data
            const mockUsers = [
                {
                    id: 1,
                    emailId: "admin@yesj.in",
                    name: "Admin User"
                },
                {
                    id: 2,
                    emailId: "user@yesj.in",
                    name: "Regular User"
                }
            ];
            
            const user = mockUsers.find(u => u.emailId === email);
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            
            // Mock credentials data
            const mockCredentials = [
                {
                    id: 1,
                    userId: 1,
                    credentialId: "mockCredentialId1",
                    publicKey: "mockPublicKey1",
                    counter: 0,
                    transports: "usb"
                },
                {
                    id: 2,
                    userId: 2,
                    credentialId: "mockCredentialId2",
                    publicKey: "mockPublicKey2",
                    counter: 0,
                    transports: "ble"
                }
            ];
            
            const credentials = mockCredentials.filter(c => c.userId === user.id);
            
            console.log('Found credentials for user:', {
                email,
                userId: user.id,
                credentialCount: credentials.length,
                credentialIds: credentials.map(c => c.credentialId.substring(0, 20) + '...')
            });
            
            if (credentials.length === 0) {
                return NextResponse.json({ error: 'No passkeys registered for this user' }, { status: 404 });
            }
            
            // Convert base64 credential IDs from DB to base64url format for the browser
            const allowCredentials = credentials.map(cred => {
                // SimpleWebAuthn expects base64url string format
                const credentialIdBase64url = base64ToBase64url(cred.credentialId);
                return {
                    id: credentialIdBase64url,
                    type: 'public-key' as const,
                };
            });
            
            const options = await generateAuthenticationOptions({
                rpID: getRpID(),
                userVerification: 'preferred',
                timeout: 60000,
                allowCredentials,
            });
            loginChallengeStore[email] = options.challenge;
            return NextResponse.json(options);
        }

        // Step 2: verify assertion response
        if (step === 'verify' && assertionResponse) {
            const expectedChallenge = loginChallengeStore[email];
            if (!expectedChallenge) {
                return NextResponse.json({ error: 'No challenge found' }, { status: 400 });
            }

            // Mock user data
            const mockUsers = [
                {
                    id: 1,
                    emailId: "admin@yesj.in",
                    name: "Admin User"
                },
                {
                    id: 2,
                    emailId: "user@yesj.in",
                    name: "Regular User"
                }
            ];
            
            const user = mockUsers.find(u => u.emailId === email);
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            // Mock credentials data
            const mockCredentials = [
                {
                    id: 1,
                    userId: 1,
                    credentialId: "mockCredentialId1",
                    publicKey: "mockPublicKey1",
                    counter: 0,
                    transports: "usb"
                },
                {
                    id: 2,
                    userId: 2,
                    credentialId: "mockCredentialId2",
                    publicKey: "mockPublicKey2",
                    counter: 0,
                    transports: "ble"
                }
            ];

            // Convert base64url credential ID from browser to base64 for DB lookup
            const credentialIdBase64 = base64urlToBase64(assertionResponse.id);
            const storedCred = mockCredentials.filter(c => c.credentialId === credentialIdBase64);

            if (storedCred.length === 0) {
                return NextResponse.json({ error: 'Credential not registered' }, { status: 404 });
            }

            // Mock verification - in a real implementation this would verify the response
            const verification = {
                verified: true,
                authenticationInfo: {
                    newCounter: storedCred[0].counter + 1,
                    credentialID: new Uint8Array(Buffer.from(storedCred[0].credentialId, 'base64')),
                    userHandle: undefined
                }
            };

            if (!verification.verified) {
                return NextResponse.json({ error: 'Authentication failed' }, { status: 400 });
            }

            const { newCounter } = verification.authenticationInfo;
            // Mock update - in a real implementation this would update the credential counter
            console.log('Mock update credential counter to:', newCounter);

            // Issue JWT (reuse same secret as password login)
            const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key');
            const { SignJWT } = await import('jose');
            const token = await new SignJWT({
                id: storedCred[0].userId,
                email,
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('24h')
                .sign(JWT_SECRET);
            const response = NextResponse.json({ success: true });
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            delete loginChallengeStore[email];
            return response;
        }

        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    } catch (error) {
        console.error('Passkey login error:', error);
        return NextResponse.json({
            error: 'Login failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
