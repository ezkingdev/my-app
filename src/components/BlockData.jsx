import React, { useState, useEffect } from 'react';

// This component fetches the latest 10 blocks from the Cardano blockchain using the Blockfrost API

// State variables to store the fetched blocks and error message
const BlockInfo = () => {
    const [blocks, setBlocks] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch the latest blocks from the Blockfrost API
    const getLatestBlocks = async () => {
        try {
            // Replace with your actual API key
            const apiKey = 'mainnetA889cpEreOCzeHraPo8eAMDrtOSkIv39';
            const url = 'https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest';

            // Fetch the latest block
            const latestBlockResponse = await fetch(url, {
                headers: {
                    'project_id': apiKey,
                },
            });

            if (!latestBlockResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const latestBlock = await latestBlockResponse.json();
            const latestBlockNumber = latestBlock.height;

            // Fetch the previous 10 blocks
            const blockPromises = [];
            for (let i = 0; i < 10; i++) {
                blockPromises.push(fetch(`https://cardano-mainnet.blockfrost.io/api/v0/blocks/${latestBlockNumber - i}`, {
                    headers: {
                        'project_id': apiKey,
                    },
                }).then(res => res.json()));
            }

            // Wait for all the block data to be fetched
            const blocksData = await Promise.all(blockPromises);

            // Update the state variables with the fetched data
            setBlocks(blocksData);
            setError(null);
        } catch (error) {
            // If there is an error, reset the state variables and set the error message
            setBlocks([]);
            setError(error.message);
        }
    };

    // Fetch the latest blocks when the component mounts
    useEffect(() => {
        getLatestBlocks();
    }, []);

    return (
        // Render the table with the fetched block data
        <div className="flex flex-col mt-10">
            <h1 className="text-2xl font-bold mb-12 text-white">Cardano Latest Blocks</h1>
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <table className="min-w-full bg-gray-950">
                <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-100">
                    <th className="py-4 px-4 border-b">Block</th>
                    <th className="py-4 px-4 border-b">Hash</th>
                    <th className="py-4 px-4 border-b">Epoch</th>
                    <th className="py-4 px-4 border-b">Slot</th>
                    <th className="py-4 px-4 border-b">Transactions</th>
                    <th className="py-4 px-4 border-b">Output (ADA)</th>
                    <th className="py-4 px-4 border-b">Tx Fee (ADA)</th>
                    <th className="py-4 px-4 border-b">BTC Value</th>
                </tr>
                </thead>
                <tbody>
                {blocks.map((block) => ( // Render the table rows with the fetched block data
                    <tr key={block.hash} className="hover:bg-gray-100 hover:text-black text-xs text-white">
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.height}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800" title={block.hash}>{block.hash.slice(0,12)}...</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.epoch}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.slot}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.tx_count}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800 text-blue-400">{block.output}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.fees}</td>
                        <td className="py-4 px-4 border-b border-0.5 border-gray-800">{block.output * 0.00000001}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlockInfo;