import Document, { NextScript, Head, Main, Html, DocumentContext, DocumentInitialProps } from "next/document";

class AppDocument extends Document {

    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='ru'>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;