import { auth } from "@/auth"
import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Users, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

const HomePage = async () => {
  const session = await auth();
  const user = session?.user;
  console.log(user)
  return (
    <div className="flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-green-500 to-transparent py-40 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Empowering Communities, One Issue at a Time</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              URBAN UPLIFT connects citizens, government, and NGOs to solve local environmental issues quickly and efficiently.
            </p>
            <div className="flex justify-center space-x-4">
              {user ?
                <Button size="lg">
                  Report an Issue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                :
                <LoginButton>
                  <Button variant='secondary' className="bg-black hover:bg-green-600 text-white" size='lg'>
                    Login To Address Issue
                  </Button>
                </LoginButton>
              }
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-8 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                    Report Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Citizens can easily report environmental problems like street light outages or road cracks.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-500" />
                    Collaborate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Government agencies and NGOs can view and address reported issues efficiently.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    Track Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Monitor the status of reported issues and see the positive impact on your community.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold mb-8 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">1,234</CardTitle>
                </CardHeader>
                <CardContent>Issues Reported</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">987</CardTitle>
                </CardHeader>
                <CardContent>Issues Resolved</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">5,678</CardTitle>
                </CardHeader>
                <CardContent>Active Contributors</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-3xl font-bold text-primary">
                    <DollarSign className="h-6 w-6 mr-1" />
                    50K
                  </CardTitle>
                </CardHeader>
                <CardContent>Funds Raised</CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage