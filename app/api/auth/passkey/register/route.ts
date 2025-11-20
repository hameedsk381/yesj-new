import { NextResponse } from 'next/server';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';

// In-memory store for challenges (for demo purposes only)
const challengeStore: Record<string, string> = {};

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
        const { email, step, attestationResponse } = await req.json();

        // Step 1: generate registration options
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
            
            const options = await generateRegistrationOptions({
                rpName: 'AICUF',
                rpID: getRpID(),
                userID: new Uint8Array(Buffer.from(user.id.toString())),
                userName: user.emailId,
                timeout: 60000,
                attestationType: 'none',
                authenticatorSelection: {
                    residentKey: 'discouraged',
                    userVerification: 'preferred',
                },
            });
            challengeStore[email] = options.challenge;
            return NextResponse.json(options);
        }

        // Step 2: verify registration response and store credential
        if (step === 'verify' && attestationResponse) {
            const expectedChallenge = challengeStore[email];
            if (!expectedChallenge) {
                return NextResponse.json({ error: 'No challenge found' }, { status: 400 });
            }

            // Mock verification - in a real implementation this would verify the response
            const verification = {
                verified: true,
                registrationInfo: {
                    credential: {
                        id: new Uint8Array(Buffer.from('mockCredentialId', 'base64')),
                        publicKey: new Uint8Array(Buffer.from('mockPublicKey', 'base64')),
                        counter: 0,
                        transports: ['usb']
                    },
                    credentialID: new Uint8Array(Buffer.from('mockCredentialId', 'base64')),
                    user: {
                        id: 'mockUserId',
                        name: 'mockUserName',
                        displayName: 'Mock User'
                    },
                    publicKey: new Uint8Array(Buffer.from('mockPublicKey', 'base64')),
                    counter: 0,
                    credentialType: 'public-key'
                }
            };

            if (!verification.verified) {
                return NextResponse.json({ error: 'Registration verification failed' }, { status: 400 });
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

            const credentialData = {
                userId: user.id,
                credentialId: Buffer.from(verification.registrationInfo.credential.id).toString('base64'),
                publicKey: Buffer.from(verification.registrationInfo.credential.publicKey).toString('base64'),
                counter: verification.registrationInfo.credential.counter,
            };

            console.log('Storing passkey credential:', {
                userId: user.id,
                credentialIdLength: credentialData.credentialId.length,
                email: user.emailId
            });

            // Mock insert - in a real implementation this would store the credential
            console.log('Mock storing credential:', credentialData);

            delete challengeStore[email];
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    } catch (error) {
        console.error('Passkey registration error:', error);
        return NextResponse.json({
            error: 'Registration failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

