import { EthereumProvider } from "@/context";
import { ExplorerLayout } from "@/src/ui/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EthereumProvider>
      <ExplorerLayout>{children}</ExplorerLayout>
    </EthereumProvider>
  );
}
